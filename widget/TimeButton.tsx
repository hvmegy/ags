import { Variable, GLib } from "astal";
import Popup from "./Popup";
import { bind } from "astal";
import AstalMpris from "gi://AstalMpris";
import MediaPlayer from "./Audio/MediaPlayer";
import Gtk from "gi://Gtk?version=4.0";

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
			valign={Gtk.Align.START}
			halign={Gtk.Align.CENTER}
			marginTop={60}
		>
			<centerbox cssClasses={["container"]}>
				<box orientation={VERTICAL} cssClasses={["container"]}>
					{bind(mpris, "players").as((players) => (
						<MediaPlayer
							cssClasses={["container-cell"]}
							player={players[0]}
						/>
					))}
					<label
						xalign={0}
						halign={START}
						label="---placeholder---"
					/>
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
				<box cssClasses={["container"]}></box>
			</centerbox>
		</Popup>
	);
}

export default function Time({ format = "%H:%M:%S" }) {
	const time = Variable<string>("").poll(
		1000,
		() => GLib.DateTime.new_now_local().format(format)!,
	);

	const timeCenter = TimeCenter();

	return (
		<box>
			<button
				widthRequest={100}
				label={time()}
				onClicked={() => {
					timeCenter.show();
				}}
			/>
		</box>
	);
}
