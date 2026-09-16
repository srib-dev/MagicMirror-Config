/**************************************************************
 * MagicMirror SRIB - Config
 *   -
 *   -
 **************************************************************/

let config = {



  /************************************************************
   * Server / network
   ************************************************************/
  address: "localhost",
  port: 8080,
  basePath: "/",
  ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

  useHttps: false,
  httpsPrivateKey: "",
  httpsCertificate: "",

  /************************************************************
   * General display settings
   ************************************************************/
  language: "no",
  locale: "nb-NO",
  logLevel: ["INFO", "LOG", "WARN", "ERROR"],
  timeFormat: 24,
  units: "metric",

  /************************************************************
   * Modules
   ************************************************************/
  modules: [

    /**********************************************************
     * Remote control UI / API
     **********************************************************/
    {
      module: "MMM-Remote-Control",
      config: {
        showModuleApiMenu: false,
        customMenu: "custom_menu.json"
      }
    },

    /**********************************************************
     * Clock
     **********************************************************/
    {
      module: "clock",
      position: "top_left",
      config: {
        displaySeconds: false,
        showPeriodUpper: true
      }
    },

    /**********************************************************
     * Base calendar (feeds MMM-MonthlyCalendar)
     *
     * The setup script injects one or more calendars using
     * the {
          symbol: "calendar-check",
          url: "https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar"
        } placeholder.
     **********************************************************/
    {
      module: "calendar",
      header: "",
      config: {
        broadcastEvents: true,
        broadcastPastEvents: true,
        maximumEntries: 1000,
        calendars: [
          {
          symbol: "calendar-check",
		  name: "events",
          url: process.env.CALENDAR_URL,
          color: "#D4AF37"
        }
        ]
      }
    },

    /**********************************************************
     * Monthly calendar grid
     *
     * CAL_VIEW_MODE is set by the setup script:
     *   - "currentMonth"
     *   - "fourWeeks"
     **********************************************************/
	
    {
      module: "MMM-CalendarExt3Agenda",
      position: "middle_center",
      config: {
        instanceId: "AGENDA",
        calendarSet: ["events"],
        locale: "nb-NO"
      }
    },

    /**********************************************************
     * Weather — 
     *
     * LATITUDE / LONGITUDE / OWM_API_KEY come from the script.
     **********************************************************/
    {
        module: "weather",
        position: "top_left",
        config: {
            weatherProvider: "yr",
            type: "current",
            lat: 60.3913,     // your latitude
            lon: 5.3221,      // your longitude
            roundTemp: true,
            initialLoadDelay: 0
        }
    },
    {
        module: "weather",
        position: "top_left",
        config: {
            weatherProvider: "yr",
            type: "forecast",
            lat: 60.3913,
            lon: 5.3221,
            initialLoadDelay: 2500 // stagger this one so it doesn't hit Yr's API at the same instant as the block above
        }
    },
    /**********************************************************
     * Wallpaper / photo slideshow — MMM-Wallpaper
     *
     * WALLPAPER_SOURCE is a full source string, e.g.:
     *   - "icloud:ALBUM_ID"
     *   - "bing"
     *   - "local:/home/pi/Pictures"
     *   - "/r/wallpapers"
     *
     * WALLPAPER_INTERVAL_MS is the slide interval in ms.
     **********************************************************/
    /*
    {
      module: "MMM-Wallpaper",
      position: "bottom_left",
      config: {
        source: "metmuseum:1,*,*",
        slideInterval: 15000, // e.g. 15000 for 15s
        maximumEntries: 50,
        shuffle: true,
        crossfade: false,
        size: "contain",
        fillRegion: false,
        width: "350px",
        height: "350px"
      }
    },
*/

    {
      module: "MMM-GoogleDriveSlideShow",
      position: "bottom_left",
      config: {
        rootFolderId: process.env.FOLDER_ID,
        maxResults: 100,
        refreshSlideShowIntervalInSeconds: 30,
        refreshDriveDelayInSeconds: 24 * 3600,
        maxWidth: "500",
        maxHeight: "500",
        theme: "none",
        mode: "contain"
      }
    },


    /**********************************************************
     * Optional modules (injected by setup script)
     *
     * Each block is either:
     *   - an empty string (disabled), or
     *   - starts with ",{" and contains the full module config
     *
     * This allows the script to completely omit the module
     * from the final config when the user chooses "no".
     **********************************************************/

    {
      module: "MMM-QRCode",
      position: "bottom_right",
      header: "Arrangementskalender",
      config: {
	text: process.env.CALENDAR_URL,
	imageSize: 250,
	showRaw: false
      }
    }


  ]
};


if (typeof module !== "undefined") {
  module.exports = config;
}
