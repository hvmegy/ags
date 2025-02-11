import { Variable, GLib } from "astal";
import Popup from "./Popup";
import { bind } from "astal";
import AstalMpris from "gi://AstalMpris";
import MediaPlayer from "./Audio/MediaPlayer";
import Gtk from "gi://Gtk?version=4.0";

import Note from "./Note/Note";

function TimeCenter(clockFormat = "%H:%M:%S", dateFormat = "%A Ngày %d %B") {
	const clock = Variable<string>("").poll(
		1000,
		() => GLib.DateTime.new_now_local().format(clockFormat)!,
	);
	const date = Variable<string>("").poll(
		1000,
		() => GLib.DateTime.new_now_local().format(dateFormat)!,
	);
	const mpris = AstalMpris.get_default();

	const { START, CENTER, END } = Gtk.Align;
	const { VERTICAL, HORIZONTAL } = Gtk.Orientation;
	return (
		<Popup
			valign={Gtk.Align.END}
			halign={Gtk.Align.CENTER}
			marginBottom={60}
		>
			<centerbox cssClasses={["container"]}>
				<box orientation={VERTICAL} cssClasses={["container"]}>
					{bind(mpris, "players").as((players) => (
						<MediaPlayer
							cssClasses={["container-cell"]}
							player={players[0]}
						/>
					))}
				</box>
				<box
					spacing={5}
					orientation={VERTICAL}
					cssClasses={["container"]}
				>
					<box
						cssClasses={["container-cell"]}
						heightRequest={100}
						orientation={Gtk.Orientation.VERTICAL}
					>
						<label cssClasses={["clock"]} label={clock()} />
						<label cssClasses={["date"]} label={date()} />
					</box>
					<Gtk.Calendar />
				</box>
				<box hexpand orientation={VERTICAL} cssClasses={["container"]}>
					<Note />
				</box>
			</centerbox>
		</Popup>
	);
}

export default function Time({ format = "%H:%M:%S" }) {
	const timeCenter = TimeCenter();

	const display = Variable.derive(
		[
			bind(timeCenter, "visible"),
			Variable<string>("").poll(
				1000,
				() => GLib.DateTime.new_now_local().format(format)!,
			),
		],
		(visible, currentTime) => {
			return visible ? "keep making it" : currentTime;
		},
	);

	return (
		<box>
			<button
				widthRequest={100}
				label={display()}
				onClicked={() => {
					timeCenter.show();
				}}
			/>
		</box>
	);
}
