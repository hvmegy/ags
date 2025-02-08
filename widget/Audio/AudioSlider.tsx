import AstalWp from "gi://AstalWp";
import { Gtk } from "astal/gtk4";
import { bind } from "astal";

export default function AudioSlider({
	widthRequest,
}: {
	widthRequest: number;
}) {
	const speaker = AstalWp.get_default()?.audio.default_speaker!;

	return (
		<box
			tooltipText={bind(speaker, "volume").as((volume) => {
				const result = Math.round(volume * 100).toString() + "%";
				return result;
			})}
			widthRequest={widthRequest}
			valign={Gtk.Align.CENTER}
		>
			<image
				iconName={bind(speaker, "volumeIcon")}
				valign={Gtk.Align.CENTER}
				onScroll={(self, _, dy) => {
					const d = dy > 0.0 ? -0.05 : 0.05;
					speaker.volume =
						d < 0
							? Math.max(speaker.volume + d, 0)
							: Math.min(speaker.volume + d, 1);
				}}
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
