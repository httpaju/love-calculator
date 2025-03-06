export default function handler(req, res) {
  const { name1, name2 } = req.body;
  const combined = (name1 + name2).toLowerCase().replace(/\s/g, "");
  let score = 0;
  for (let char of combined) {
    score += char.charCodeAt(0);
  }
  const percentage = (score % 100) + 1;
  res.status(200).json({ percentage });
}