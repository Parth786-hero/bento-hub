import { motion } from "framer-motion";

export default function EmojiRain() {
  const emojis = ["🎉", "🎂", "🎁", "✨", "🥳"];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: "100vh", opacity: 1 }}
          transition={{ duration: 3, delay: i * 0.3 }}
          className="absolute left-[50%] text-3xl"
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
