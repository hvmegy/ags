import { App } from "astal/gtk4";
import style from "./style.scss";
import Bar from "./widget/Bar";

App.start({
	icons: `/home/hvmegy/.config/ags/Gruvbox-Plus-Dark/panel/24`,
	css: style,
	main() {
		App.get_monitors().map(Bar);
	},
});
