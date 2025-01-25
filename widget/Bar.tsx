import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable } from "astal";

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
				<box>label</box>
				<box hexpand halign={Gtk.Align.END}></box>
			</centerbox>
		</window>
	);
}
