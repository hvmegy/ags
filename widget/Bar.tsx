import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable } from "astal";
import Time from "./TimeButton";
import Audio from "./Audio/Audio";
import AudioSlider from "./Audio/AudioSlider";
import Internet from "./Internet";
import Battery from "./Battery";

export default function Bar(gdkmonitor: Gdk.Monitor) {
	const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

	return (
		<window
			visible
			cssClasses={["Bar"]}
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={BOTTOM | LEFT | RIGHT}
			// marginRight={50}
			// marginLeft={50}
		>
			<centerbox>
				<box></box>
				<box cssClasses={["container"]}>
					<Time />
				</box>
				<box
					cssClasses={["container"]}
					hexpand
					halign={Gtk.Align.END}
					spacing={10}
				>
					<Internet />
					<Audio />
					{/* <AudioSlider widthRequest={200} /> */}
					<Battery />
				</box>
			</centerbox>
		</window>
	);
}
