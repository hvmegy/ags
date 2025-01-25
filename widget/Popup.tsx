import { App, Astal, Gdk, Gtk } from "astal/gtk4";

const { TOP, RIGHT, BOTTOM, LEFT } = Astal.WindowAnchor;

type PopupProps = {
	child?: unknown;
	marginBottom?: number;
	marginTop?: number;
	marginLeft?: number;
	marginRight?: number;
	halign?: Gtk.Align;
	valign?: Gtk.Align;
};

export default function Popup({
	child,
	marginBottom,
	marginTop,
	marginLeft,
	marginRight,
	halign = Gtk.Align.CENTER,
	valign = Gtk.Align.CENTER,
}: PopupProps) {
	return (
		<window
			visible={false}
			cssClasses={["PopupWindow"]}
			// css="background-color: transparent"
			keymode={Astal.Keymode.EXCLUSIVE}
			anchor={TOP | RIGHT | BOTTOM | LEFT}
			exclusivity={Astal.Exclusivity.IGNORE}
			// close when click occurs otside of child
			onButtonPressed={(self, event) => {
				const [, _x, _y] = event.get_position();
				const { x, y, width, height } = self
					.get_child()!
					.get_allocation();

				const xOut = _x < x || _x > x + width;
				const yOut = _y < y || _y > y + height;

				// clicked outside
				if (xOut || yOut) self.hide();
			}}
			// close when hitting Escape
			onKeyPressed={(self, keyval) => {
				if (keyval === Gdk.KEY_Escape) {
					self.hide();
				}
			}}
		>
			<box
				cssClasses={["PopupContent"]}
				// onButtonPressEvent={() => true} // make sure click event does not bubble up
				// child can be positioned with `halign` `valign` and margins
				halign={halign}
				valign={valign}
				marginBottom={marginBottom}
				marginTop={marginTop}
				marginStart={marginLeft}
				marginEnd={marginRight}
			>
				{child}
			</box>
		</window>
	);
}
