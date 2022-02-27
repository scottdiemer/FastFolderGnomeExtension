/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = "fast-folder";

const { GObject, St } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const _ = ExtensionUtils.gettext;

const Indicator = GObject.registerClass(
  class Indicator extends PanelMenu.Button {
    _init() {
      super._init(0);

      this.add_child(
        new St.Icon({
          icon_name: "folder=saved-search",
          style_class: "system-status-icon",
        })
      );

      let item = new PopupMenu.PopupMenuItem("Hello");
      this.menu.addMenuItem(item);

      this.menu.addMenuItem(new PopupMenu.PopupMenuItem("hello 2"));
      this.menu.addMenuItem(new PopupMenu.PopupMenuItem("hello 3"));
      this.menu.addMenuItem(new PopupMenu.PopupMenuItem("hello 4"));
      this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
      this.menu.addMenuItem(new PopupMenu.PopupMenuItem("hello 5"));
      this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
      this.menu.addMenuItem(new PopupMenu.PopupMenuItem("hello 4"));
      this.menu.addMenuItem(new PopupMenu.PopupMenuItem("hello 5"));
    }
  }
);

class Extension {
  constructor(uuid) {
    this._uuid = uuid;

    ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
  }

  enable() {
    log(`enabling ${Me.metadata.name}`);
    this._indicator = new Indicator();
    Main.panel.addToStatusArea(this._uuid, this._indicator);
  }

  disable() {
    log(`disabling ${Me.metadata.name}`);
    this._indicator.destroy();
    this._indicator = null;
  }
}

function init(meta) {
  log(`initializing ${Me.metadata.name}`);
  return new Extension(meta.uuid);
}
