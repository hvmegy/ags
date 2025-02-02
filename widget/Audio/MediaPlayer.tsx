import AstalMpris from "gi://AstalMpris";
import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import Pango from "gi://Pango";

export default function MediaPlayer({
	player: player,
	cssClasses,
}: {
	player: AstalMpris.Player;
	cssClasses: string[];
}) {
	if (!player) {
		return <box />;
	}
	const title = bind(player, "title").as((t) => t || "Unknown Track");
	const artist = bind(player, "artist").as((a) => a || "Unknown Artist");
	const coverArt = bind(player, "coverArt");

	const playIcon = bind(player, "playbackStatus").as((s) =>
		s === AstalMpris.PlaybackStatus.PLAYING
			? "media-playback-pause-symbolic"
			: "media-playback-start-symbolic",
	);

	const { START, CENTER, END } = Gtk.Align;
	return (
		<box cssClasses={cssClasses} spacing={5} widthRequest={200}>
		{ coverArt ? 
			<image
				overflow={Gtk.Overflow.HIDDEN}
				valign={Gtk.Align.START}
				pixelSize={50}
				cssClasses={["cover"]}
				file={coverArt}
			/>
			: <></>
		}
			<box vertical hexpand>
				<label
					ellipsize={Pango.EllipsizeMode.END}
					halign={Gtk.Align.START}
					label={title}
					widthChars={15}
					maxWidthChars={15}
					xalign={0}
				/>
				<label halign={Gtk.Align.START} label={artist} />
			</box>
			<button
				halign={Gtk.Align.END}
				valign={Gtk.Align.START}
				onClicked={() => player.next()}
				visible={bind(player, "canGoPrevious")}
			>
				<image iconName="media-skip-backward-symbolic" pixelSize={24} />
			</button>
			<button
				halign={Gtk.Align.END}
				valign={Gtk.Align.START}
				onClicked={() => player.play_pause()}
				visible={bind(player, "canControl")}
			>
				<image iconName={playIcon} pixelSize={18} />
			</button>
			<button
				halign={Gtk.Align.END}
				valign={Gtk.Align.START}
				onClicked={() => player.next()}
				visible={bind(player, "canGoNext")}
			>
				<image iconName="media-skip-forward-symbolic" pixelSize={24} />
			</button>
		</box>
	);
}
