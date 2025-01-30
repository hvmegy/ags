import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable } from "astal";
import Time from "./Time";
import Audio from "./Audio/Audio";

export default function Bar(gdkmonitor: Gdk.Monitor) {
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

	return (
		<window
			visible
			cssClasses={["Bar"]}
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT}
			marginTop={5}
			marginRight={30}
			marginLeft={30}
		>
			<centerbox>
				<box></box>
				<box>
					<Time />
				</box>
				<box hexpand halign={Gtk.Align.END}>
					<Audio />
				</box>
			</centerbox>
		</window>
	);
}
