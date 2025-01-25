import Gtk from "gi://Gtk";

export default function Separator({
	orientation,
}: {
	orientation: Gtk.Orientation;
}) {
	return (
		<box
			cssClasses={["separator"]}
			orientation={orientation}
			hexpand={true}
			vexpand={true}
			heightRequest={1}
		></box>
	);
}
