import AstalWp from "gi://AstalWp";
import { Gtk } from "astal/gtk4";
import { bind } from "astal";

export default function AudioSlider() {
	const speaker = AstalWp.get_default()?.audio.default_speaker!;

	return (
		<box cssClasses={["AudioSlider"]} valign={Gtk.Align.CENTER}>
			<image
				iconName={bind(speaker, "volumeIcon")}
				valign={Gtk.Align.CENTER}
			/>
			<slider
				value={bind(speaker, "volume")}
				onChangeValue={(self) => {
					speaker.volume = self.value;
				}}
				onScroll={(self, _, dy) => {
					const d = dy > 0.0 ? -0.05 : 0.05;
					self.value =
						d < 0
							? Math.max(self.value + d, 0)
							: Math.min(self.value + d, 1);
				}}
				hexpand
			/>
		</box>
	);
}
