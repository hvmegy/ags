import { Variable } from "astal";
import { GLib } from "astal";
import { Gtk } from "astal/gtk4";
import WebKit60 from "gi://WebKit";
import { bind } from "astal";
import { Widget } from "astal/gtk4";

import { marked } from "marked";

const filePath = `${GLib.get_current_dir()}/widget/Note/note.md`;

export function WebView() {
	const noteContent = GLib.file_get_contents(filePath)[1].toString();

	const { START, CENTER, END } = Gtk.Align;

	const html = `
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
            ${marked(noteContent).toString()}
        </body>
    </html>
`;
	const webView = new WebKit60.WebView();
	webView.load_html(html, null);
	webView.vexpand = true;
	webView.heightRequest = 300;
	webView.hexpand = true;

	return <box>{webView}</box>;
}

function ScrollNote() {
	const webView = WebView();
	const scrolledWindow = new Gtk.ScrolledWindow();
	scrolledWindow.set_child(webView);
	scrolledWindow.heightRequest = 300;
	scrolledWindow.widthRequest = 300;
	return scrolledWindow;
}

export default function Note() {
	const scrollNoteVar = Variable(ScrollNote());
	return (
		<box orientation={Gtk.Orientation.VERTICAL}>
			{/* Add WebView inside the Box */}
			<box hexpand={true} spacing={5}>
				<button
					hexpand
					iconName={"edit"}
					onClicked={() => {
						GLib.spawn_command_line_async(`kitty nvim ${filePath}`);
					}}
				/>
				<button
					hexpand
					iconName={"reload"}
					onClicked={() => {
						scrollNoteVar.set(ScrollNote());
					}}
				/>
			</box>

			{scrollNoteVar()}
		</box>
	);
}
