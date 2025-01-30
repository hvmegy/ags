import { Variable, GLib } from "astal";

export default function Time({ format = "%H:%M:%S" }) {
	const time = Variable<string>("").poll(
		1000,
		() => GLib.DateTime.new_now_local().format(format)!,
	);
	return (
		<box>
			<label label={time()} />
		</box>
	);
}
