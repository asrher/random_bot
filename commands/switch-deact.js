
 const { sck,sck1,cmd, getAdmin, tlang, prefix } = require('../lib')
 const Config = require('../config')
 
     //---------------------------------------------------------------------------
 cmd({
         pattern: "عطل",
         filename: __filename
     },
     async(Void, citel, text,{ isCreator }) => {
         //-----------------------------------------	
         if (!citel.isGroup) return citel.reply(tlang().group);
         const groupAdmins = await getAdmin(Void, citel)
         const botNumber = await Void.decodeJid(Void.user.id)
         const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
         const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
         //-----------------------------------------  
         if (!citel.isGroup) return citel.reply("هذا الامر خاص بالقروب")
         if (!text) return citel.reply(`اختر وش تبي تعطل\n1-الاحداث\n2-البنك\n3-مضاد_روابط`)
         if (!isAdmins) return citel.reply("هذا الامر خاص بالمشرفين")
         switch (text.split(" ")[0]) {
            case 'antilink':
                {
                    let checkgroup = await sck.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new sck({ id: citel.chat, antilink: "false" })
                            .save()
                        return citel.reply('تم تعطيل مضاد الروابط')
                    } else {
                        if (checkgroup.antilink == "false") return citel.reply("معطل مسبقا")
                        await sck.updateOne({ id: citel.chat }, { antilink: "false" })
                        citel.reply('تم تعطيل مضاد الروابط')
                        return
                    }
                }
                break
                       case 'البنك':
                {
                    let checkgroup = await sck.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new sck({ id: citel.chat, economy: "false" })
                            .save()
                        return citel.reply('تم تعطيل البنك')
                    } else {
                        if (checkgroup.economy == "false") return citel.reply("معطل مسبقا")
                        await sck.updateOne({ id: citel.chat }, { economy: "false" })
                        citel.reply('تم تعطيل البنك')
                        return
                    }
                }
                break
                case 'الاحداث':
                    {
                        let checkgroup = await sck.findOne({ id: citel.chat })
                        if (!checkgroup) {
                            await new sck({ id: citel.chat, events: "false" })
                                .save()
                            return citel.reply("تم تعطيل الاحداث")
                        } else {
                            if (checkgroup.events == "false") return citel.reply("معطل مسبقا")
                            await sck.updateOne({ id: citel.chat }, { events: "false" })
                            return citel.reply("تم تعطيل الاحداث")
                        }
                    }
                    break
                default:
                    {
                        citel.reply("اختر وش تبي تعطل\n1-الاحداث\n2-البنك\n3-مضاد_روابط")
                    }
         }
     }
 )
