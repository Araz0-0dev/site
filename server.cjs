var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_promises = __toESM(require("node:fs/promises"), 1);
var import_vite = require("vite");
var SEED_COMMENTS = [
  {
    id: "seed-1",
    name: "Sarah (Game Designer)",
    text: "Arazm, you are incredible! A 13-year-old building custom top-down survival games with Godot is absolutely legendary. Keep pushing boundaries!",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1e3).toLocaleString(),
    likes: 12
  },
  {
    id: "seed-2",
    name: "\u0645\u0647\u0631\u0627\u0646 (\u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0646\u0648\u06CC\u0633 \u0627\u0631\u0634\u062F)",
    text: "\u06A9\u0627\u0631\u062A \u0641\u0648\u0642\u200C\u0627\u0644\u0639\u0627\u062F\u0647\u200C\u0633\u062A \u067E\u0633\u0631! \u0628\u0627\u0632\u06CC \u0628\u0642\u0627 \u062A\u0648 \u06AF\u0648\u062F\u0648\u062A \u0631\u0648 \u062F\u06CC\u062F\u0645\u060C \u0628\u0631\u0627\u06CC \u0633\u0646 \u06F1\u06F3 \u0633\u0627\u0644 \u0627\u06CC\u0646 \u0641\u0648\u0642\u200C\u0627\u0644\u0639\u0627\u062F\u0647 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC \u0637\u0631\u0627\u062D\u06CC \u0634\u062F\u0647. \u062F\u0645\u062A \u06AF\u0631\u0645 AM \u{1F525}",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toLocaleString("fa-IR"),
    likes: 18
  },
  {
    id: "seed-3",
    name: "Alex_Dev",
    text: "The Tkinter accurate volume calculator operates with clean python script logic. Excited to see your upcoming Android messenger app launch on GitHub!",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1e3).toLocaleString(),
    likes: 7
  },
  {
    id: "seed-4",
    name: "\u0633\u067E\u0647\u0631",
    text: "\u0628\u062E\u0634 \u0628\u0627\u0632\u06CC \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A\u062A \u0641\u0648\u0642\u200C\u0627\u0644\u0639\u0627\u062F\u0647 \u0633\u0631\u06AF\u0631\u0645\u200C\u06A9\u0646\u0646\u062F\u0647 \u0628\u0648\u062F! \u0645\u06A9\u0627\u0646\u06CC\u06A9 \u0634\u0644\u06CC\u06A9 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0647 \u0632\u0627\u0645\u0628\u06CC\u200C\u0647\u0627 \u0648\u0627\u0642\u0639\u0627 \u0639\u0627\u0644\u06CC\u0647. \u0645\u0648\u0641\u0642 \u0628\u0627\u0634\u06CC \u067E\u0633\u0631 \u0647\u0648\u0634\u0645\u0646\u062F.",
    date: new Date(Date.now() - 8 * 60 * 60 * 1e3).toLocaleString("fa-IR"),
    likes: 15
  }
];
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  const DATA_DIR = import_path.default.join(process.cwd(), "data");
  const COMMENTS_FILE = import_path.default.join(DATA_DIR, "comments.json");
  try {
    await import_promises.default.mkdir(DATA_DIR, { recursive: true });
    try {
      await import_promises.default.access(COMMENTS_FILE);
    } catch {
      await import_promises.default.writeFile(COMMENTS_FILE, JSON.stringify(SEED_COMMENTS, null, 2), "utf8");
      console.log("Seeded initial comments in database!");
    }
  } catch (err) {
    console.error("Error initializing comment directory:", err);
  }
  app.use(import_express.default.json());
  app.get("/api/comments", async (req, res) => {
    try {
      const content = await import_promises.default.readFile(COMMENTS_FILE, "utf8");
      const comments = JSON.parse(content);
      res.json(comments);
    } catch (error) {
      console.error("Failed to read comments:", error);
      res.status(500).json({ error: "Failed to retrieve comments from database" });
    }
  });
  app.post("/api/comments", async (req, res) => {
    try {
      const { name, text } = req.body;
      if (!name || !text || String(name).trim() === "" || String(text).trim() === "") {
        return res.status(400).json({ error: "Name and message are required" });
      }
      const content = await import_promises.default.readFile(COMMENTS_FILE, "utf8");
      const comments = JSON.parse(content);
      const isFarsi = /[\u0600-\u06FF]/.test(text + name);
      const formattedDate = isFarsi ? (/* @__PURE__ */ new Date()).toLocaleString("fa-IR") : (/* @__PURE__ */ new Date()).toLocaleString();
      const newComment = {
        id: "comment-" + Date.now() + "-" + Math.floor(Math.random() * 1e3),
        name: String(name).slice(0, 48).trim(),
        text: String(text).slice(0, 500).trim(),
        date: formattedDate,
        likes: 0
      };
      comments.unshift(newComment);
      await import_promises.default.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), "utf8");
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Failed to save comment:", error);
      res.status(500).json({ error: "Failed to persist comment in database" });
    }
  });
  app.post("/api/comments/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      const content = await import_promises.default.readFile(COMMENTS_FILE, "utf8");
      const comments = JSON.parse(content);
      const commentIndex = comments.findIndex((c) => c.id === id);
      if (commentIndex === -1) {
        return res.status(404).json({ error: "Comment not found" });
      }
      comments[commentIndex].likes += 1;
      await import_promises.default.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), "utf8");
      res.json(comments[commentIndex]);
    } catch (error) {
      console.error("Failed to update likes:", error);
      res.status(500).json({ error: "Failed to update likes on database" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
