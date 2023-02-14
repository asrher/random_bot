
 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd } = require('../lib')
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------
 cmd({
    pattern: "ترحيب_دخول",
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
          let Group = await sck.findOne({ id: citel.chat })
            if (!Group) {
                await new sck({ id: citel.chat, welcome: text,events:'true' }).save()
                return citel.reply('تم')
            } else {
                await await sck.updateOne({ id: citel.chat }, { welcome:text ,events:'true'})
                return citel.reply('تم')
                
            }      
}
)
 //---------------------------------------------------------------------------
cmd({
    pattern: "رسالة_خروج",
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
          let Group = await sck.findOne({ id: citel.chat })
            if (!Group) {
                await new sck({ id: citel.chat, goodbye: text,events:'true' }).save()
                return citel.reply('تم');
            } else {
                await await sck.updateOne({ id: citel.chat }, { goodbye:text,events:'true' })
                return citel.reply('تم');     
            }      
}
)
 //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     cmd({
        pattern: "ملصقي",
        filename: __filename,
    },
    async(Void, citel, text) => {
        if (!citel.quoted) return citel.reply(`*رد على صورة او فيديو*`);
        let mime = citel.quoted.mtype
        var pack;
        var author;
        if (text) {
            anu = text.split("|");
            pack = anu[0] !== "" ? anu[0] : citel.pushName + 'bot';
            author = anu[1] !== "" ? anu[1] : Config.author;
        } else {
            pack = citel.pushName;
            author = "bot";
        }
            let media = await citel.quoted.download();
           let sticker = new Sticker(media, {
               pack: pack, // The pack name
               author: author, // The author name
               type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
               categories: ["🤩", "🎉"], // The sticker category
               id: "12345", // The sticker id
               quality: 75, // The quality of the output file
               background: "transparent", // The sticker background color (only for full stickers)
           });
           const buffer = await sticker.toBuffer();
           return Void.sendMessage(citel.chat, {sticker: buffer }, {quoted: citel });
    }
)
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "رابطه",
             filename: __filename,
         },
         async(Void, citel, text) => {
             let users = citel.mentionedJid ? citel.mentionedJid[0].split('@')[0] : citel.quoted ? citel.quoted.sender.split('@')[0] : text.replace('@')[0]
             citel.reply(`https://wa.me/${users}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "شخص",
             filename: __filename,
         },
         async(Void, citel, match) => {
             if (!match) return citel.reply("*اختر صفة معينة?*");
             const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
                 .catch((e) => {}) : "";
             const participants = citel.isGroup ? await groupMetadata.participants : "";
             let member = participants.map((u) => u.id);
             let me = citel.sender;
             let pick = member[Math.floor(Math.random() * member.length)];
             Void.sendMessage(citel.chat, {
                 text: `اكثر شخص ${match} في هذا القروب هو *@${pick.split("@")[0]}*`,
                 mentions: [pick],
             }, {
                 quoted: citel,
             });
         }
     )
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "عكس",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`مثال : .عكس جيرايا`)
             flipe = text.split('').reverse().join('')
             citel.reply(`\`\`\`「  عكس الكلمات  」\`\`\`\n*الكلمة الاصليه :*\n${text}\n*العكس حقها :*\n${flipe}`)
 
         }
     )
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "الاحداث",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}شغل الاحداث`,
                     buttonText: {
                         displayText: "تشغيل",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}عطل الاحداث`,
                     buttonText: {
                         displayText: "تعطيل",
                     },
                     type: 1,
                 },
             ];
             await Void.sendButtonText(citel.chat, buttons, `اختر تشغيل او تعطيل الاحداث`, Void.user.name, citel);
         }
     )
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "بيناري",
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(``);
 
                 let textt = text || citel.quoted.text
                 let eb = await eBinary(textt);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "بيناري1",
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(``);
                 let eb = await dBinary(text);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
cmd({
  pattern: "بوت",
  filename: __filename,
},
async(Void, citel, text,{isCreator}) => {
  if (!citel.isGroup) return citel.reply(tlang().group);
  if(!isCreator) return //citel.reply(tlang().owner)
switch (text.split(" ")[0]) {
 case 'on':{
         let checkgroup = await sck.findOne({ id: citel.chat })
         if (!checkgroup) {
             await new sck({ id: citel.chat, botenable: "شغال" }).save()
             return citel.reply(`يمكنك استعمال البوت فالقروب`)
         } else {
             if (checkgroup.botenable == "شغال") return citel.reply("البوت شغال مسبقا")
             await sck.updateOne({ id: citel.chat }, { botenable: "شغال" })
             return citel.reply(`يمكنك استعمال البوت فالقروب `)
         }
     }
  
 break
case 'off':{
            {
             let checkgroup = await sck.findOne({ id: citel.chat })
             if (!checkgroup) {
                 await new sck({ id: citel.chat, botenable: "معطل" })
                     .save()
                 return citel.reply(`تم منع البوت فالقروب `)
             } else {
                 if (checkgroup.botenable == "معطل") return citel.reply("البوت غير شغال مسبقا")
                 await sck.updateOne({ id: citel.chat }, { botenable: "معطل" })
                 return citel.reply(`تم منع البوت فالقروب `)
             }
         }
}
break
default:{
let checkgroup = await sck.findOne({ id: citel.chat })
let buttons = [{
          buttonId: `${prefix}بوت on`,
          buttonText: {
              displayText: "تشغيل",
          },
          type: 1,
      },
      {
          buttonId: `${prefix}بوت off`,
          buttonText: {
              displayText: "تعطيل",
          },
          type: 1,
      },
  ];
  await Void.sendButtonText(citel.chat, buttons, `تشغيل او تعطيل البوت: ${checkgroup.botenable}`, Void.user.name, citel);
}
}
})   
        
     //---------------------------------------------------------------------------
 cmd({
             pattern: "antilink",
             alias: ["مضاد_روابط"],
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}شغل antilink`,
                     buttonText: {
                         displayText: "تشغيل",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}عطل antilink`,
                     buttonText: {
                         displayText: "تعطيل",
                     },
                     type: 1,
                 },
             ];
             await Void.sendButtonText(citel.chat, buttons, `تشغيل او تعطيل مضاد الروابط`, Void.user.name, citel);
         }
     )
     //---------------------------------------------------------------------------
 cmd({ on: "body" }, async(Void, citel) => {
     if (Config.autoreaction === 'true' && citel.text.startsWith(prefix)) {
         const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         Void.sendMessage(citel.chat, {
             react: {
                 text: emokis,
                 key: citel.key
             }
         })
     }
 })
