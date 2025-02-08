import { Variable } from "astal";
import { GLib } from "astal";
import { Gtk } from "astal/gtk4";
import WebKit60 from "gi://WebKit";
import { bind } from "astal";
import { Widget } from "astal/gtk4";

import { marked } from "marked";

export function WebView({
	filePath = `${GLib.get_current_dir()}/widget/Note/note.md`,
}) {
	const noteContent = GLib.file_get_contents(filePath)[1].toString();

	const { START, CENTER, END } = Gtk.Align;
	const html = marked(noteContent).toString();

	const htmlWithCSS = `
    <html>
        <head>
        	<style>
                body {
		                background: #282828;
		                color: #ebdbb2;
		                font-family: Inter;
		                font-size: 16px;
		                font-weight: bold;
		                border-radius: 10px;
		                box-shadow: 0 0 0 0;
                }
            </style>
        </head>
        <body>
            ${html}
        </body>
    </html>
`;
	const webView = new WebKit60.WebView();
	webView.load_html(htmlWithCSS, null);
	webView.vexpand = false;
	webView.heightRequest = 300;
	webView.hexpand = true;

	return <box>{webView}</box>;
}

export default function Note() {
	const webView = WebView({});
	const scrolledWindow = new Gtk.ScrolledWindow();
	scrolledWindow.set_child(webView);
	scrolledWindow.heightRequest = 500;
	scrolledWindow.widthRequest = 300;

	return (
		<box orientation={Gtk.Orientation.VERTICAL}>
			{/* Add WebView inside the Box */}
			<button iconName={"edit"} />
			{scrolledWindow}
		</box>
	);
}
