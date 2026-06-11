#!/bin/bash
# Double-click to launch the Success Jae demo site locally.
# Keep this window open while viewing/recording. Press Ctrl+C (or close it) to stop.

cd "$(dirname "$0")" || exit 1
PORT=8137
NAME="Success Jae — Scroll Cinematic"

# Free the port if something is already on it.
lsof -nP -iTCP:$PORT -sTCP:LISTEN -t 2>/dev/null | xargs kill -9 2>/dev/null
URL="http://localhost:$PORT"
echo ""
echo "  $NAME"
echo "  Open in your browser:  $URL"
echo "  Keep this window open while recording. Ctrl+C to stop."
echo ""
( sleep 1 && (open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null) ) &
python3 -m http.server $PORT
