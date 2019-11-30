const Tutors = require("../models/Tutors");

module.exports = {
  name: "addtutor",
  description: "Adds a tutor to the SnR website, use `characters` command to list valid names",
  guildOnly: true,
  roleRequired: 2, // 0=None, 1=Mod, 2=Admin, 3=Co-Owner, 4=Owner
  charRequired: true,
  argsRequired: 2,
  mentionsRequired: 1,
  usage: "<user> <character>",
  async execute(msg, args) {
    const re = /<@/;
    const tutor = msg.mentions.users.first().tag;
    const character = args.filter(arg => !re.test(arg));

    try {
      const alreadyExists = await Tutors.find({ charName: character[0], tutors: tutor }).limit(1);

      if (alreadyExists.length > 0) {
        msg.reply(`${tutor} is already a tutor for ${character[0]}`);
        return;
      }

      await Tutors.updateOne({ charName: character[0] }, { $push: { tutors: tutor } }, { upsert: true });
    } catch {
      msg.reply("Database error");
      return;
    }

    msg.reply(`added ${tutor} as a tutor for ${character[0]}`);
    return;
  },
};