import AstalWp from "gi://AstalWp?version=0.1";
import { Gtk } from "astal/gtk4";
import { bind } from "astal";
import Popup from "../Popup";
import AudioSlider from "./AudioSlider";

export default function Audio() {
	const speaker = AstalWp.get_default()?.audio.default_speaker!;
	const popup = (
		<Popup
			halign={Gtk.Align.END}
			valign={Gtk.Align.START}
			marginTop={75}
			marginRight={20}
			marginLeft={10}
		>
			<box
				cssClasses={["AudioContainer"]}
				widthRequest={200}
				orientation={Gtk.Orientation.VERTICAL}
				halign={Gtk.Align.CENTER}
				valign={Gtk.Align.CENTER}
				spacing={10}
			>
				<AudioSlider widthRequest={50} />
			</box>
		</Popup>
	);
	return (
		<box cssClasses={["Audio", "container"]} valign={Gtk.Align.CENTER}>
			<button
				onScroll={(self, _, dy) => {
					const d = dy > 0.0 ? -0.05 : 0.05;
					speaker.volume =
						d < 0.0
							? Math.max(speaker.volume + d, 0.0)
							: Math.min(speaker.volume + d, 1.0);
					// printerr("FROM BUTTON: " + d, dy, speaker.volume);
				}}
				iconName={bind(speaker, "volumeIcon")}
				onClicked={() => popup.show()}
			></button>
		</box>
	);
}
