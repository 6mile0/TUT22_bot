// こうかとん22
// 2022-01-02 作成
// 2022-02-10 v2 リリース
// 2022-02-20 v2.1.0 リリース
// 2022-02-21 v2.2.0 リリース

const { setTimeout } = require('timers/promises');

// ========================================================
// 環境設定
// ========================================================

const token = "YOUR_TOKEN"; // DiscordのBotのトークン
const botname = "こうかとん22"; // Botの名前
const ver = "v2.2.0"; // 現在バージョン

// ========================================================

// ========================================================
// チャンネル設定
// ========================================================

const systemCH = "941327431132934154"; // 参加通知を送るチャンネル
const introCH = "923600953553346660"; // 自己紹介CHのID

const BS = "925365257055141889"; // 応用生物学部
const CS = "925364635106967582"; // コンピュータサイエンス学部
const MS = "925365138838671430"; // メディア学部
const ES = "925364329879060481"; //工学部
const DS = "925365558470397953"; // デザイン学部
const HS = "925365770068852756"; // 医療保健学部
const Authed = "941285513560743946"; // 認証済み
const no_Authed = "943149918493769771"; // 未認証

// ========================================================
const { Client, Intents, MessageEmbed } = require("discord.js");

const client = new Client({
  intents: [
    "GUILD_MEMBERS",
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once("ready", () => {
  console.log("準備完了");
  client.user.setPresence({ activities: [{ name: "Ver " + ver }] });
});

client.on("guildMemberAdd", (member) => {
  function sys_message_Send(content) {
    // 一般CHへのメッセージ送信機構
    client.channels.cache.get(systemCH).send(content);
  }

  member.roles.add(no_Authed); // 新規加入ユーザーに未認証ロールを付与
  sys_message_Send(`<@${member.id}>`); // 新規ユーザーにメンション
  const grach = new MessageEmbed() // 定形自己紹介案内送信
    .setTitle(member.displayName + "さん，TUT22へようこそ！")
    .setColor("#ff8c00")
    .setDescription(
      "まず <#923604874908811264>をお読みいただき， <#923600953553346660> にて自己紹介をよろしくお願いします:pray:"
    )
    .addFields({
      name: "\u200B",
      value:
        "【注意】自己紹介する際に，**最初の2文字は必ず「CS」などの学部識別略称(サーバーガイド必読)をつけてください**。",
    })
    .setTimestamp()
    .setFooter(botname, "https://i.imgur.com/AJdL29v.jpg");
  sys_message_Send({ embeds: [grach] });
});

client.on("messageUpdate", (oldMessage, newMessage) => { // 編集メッセージからロール付与
  if (oldMessage == newMessage) {
    return;
  } else {
    if (newMessage.channel.id === introCH) {
      var user = newMessage.author.username; // メッセージ変更ユーザー取得
      function message_Send(content) {
        // 一般CHへのメッセージ送信機構
        client.channels.cache.get(systemCH).send(content);
      }

      if (newMessage.content.substring(0, 2) === "BS" || newMessage.content.substring(0, 2) === "ＢＳ") {
        var gakubu = "応用生物学部";
        var role = BS;
      } else if (newMessage.content.substring(0, 2) === "CS" || newMessage.content.substring(0, 2) === "ＣＳ") {
        var gakubu = "コンピュータサイエンス学部";
        var role = CS;
      } else if (newMessage.content.substring(0, 2) === "MS" || newMessage.content.substring(0, 2) === "ＭＳ") {
        var gakubu = "メディア学部";
        var role = MS;
      } else if (newMessage.content.substring(0, 2) === "ES" || newMessage.content.substring(0, 2) === "ＥＳ") {
        var gakubu = "工学部";
        var role = ES;
      } else if (newMessage.content.substring(0, 2) === "DS" || newMessage.content.substring(0, 2) === "ＤＳ") {
        var gakubu = "デザイン学部";
        var role = DS;
      } else if (newMessage.content.substring(0, 2) === "HS" || newMessage.content.substring(0, 2) === "ＨＳ") {
        var gakubu = "医療保健学部";
        var role = HS;
      }

      if (role === undefined) {
        return;
      } else {
        if (newMessage.member.roles.cache.some(r => r == no_Authed)) {
          newMessage.member.roles.remove(no_Authed); // 対象ユーザーから未認証ロール削除
          newMessage.member.roles.add(role); // 対象ユーザーに対象学部のロールを付与
          newMessage.member.roles.add(Authed); // 対象ユーザーに認証済みのロールを付与

          const grach = new MessageEmbed()
            .setTitle(user + "さんいらっしゃい！")
            .setColor("#00ff6a")
            .setDescription(
              "メッセージの編集を検知しました:ok:"
            )
            .addFields({
              name: "\u200B",
              value:
                gakubu + "のロールを付与し，認証済みユーザーとなりました。よろしくね！",
            })
            .setTimestamp()
            .setFooter(botname, "https://i.imgur.com/AJdL29v.jpg");
          message_Send({ embeds: [grach] });

        }
      }
    }
  }
});

client.on("messageCreate", async (msg) => {
  function message_Send(content) {
    // 一般CHへのメッセージ送信機構
    client.channels.cache.get(systemCH).send(content);
  }

  if (msg.author.bot) {
    // bot同士の会話回避
    return;
  }

  if (msg.content.match(/^(?=.*死ね).*$/)) {
    const message = await msg.channel.send("暴言が検出されました。削除します。(このメッセージも5秒後削除されます。)");
    msg.delete();
    await setTimeout(5000);
    message.delete();
  }
  if (msg.content.match(/^(?=.*ウザい).*$/)) {
    const message = await msg.channel.send("暴言が検出されました。削除します。(このメッセージも5秒後削除されます。)");
    msg.delete();
    await setTimeout(5000);
    message.delete();
  }

  if (msg.content.match(/^(?=.*おやすみ).*$/)) {
    msg.react('👋')
  }

  if (msg.content.substring(0, 1) == "!") {
    // !で始まるメッセージを受け取る
    if (msg.content.substring(1, 4) === "へるぷ") {
      msg.channel.send("ヘルプを表示します。");
      msg.channel.send(
        "```" +
        "◆はじめに \n まずこのサーバーへ参加した方々には自己紹介をお願いしております。\n 自己紹介後各部ごとのロール（名前の色(学部カラーに由来)）が付与されます。\n 円滑なサーバー運営のため，ご協力よろしくお願いします。" +
        "```"
      );
      msg.channel.send(
        "```" +
        "◆機能一覧 \n＊「!へるぷ」 -> 機能一覧（このヘルプ）を表示します。" +
        "```"
      );
    }
  }

  if (msg.channel.id === introCH) {
    var user = msg.author.username; // メッセージ変更ユーザー取得
    function message_Send(content) {
      // 一般CHへのメッセージ送信機構
      client.channels.cache.get(systemCH).send(content);
    }

    if (msg.content.substring(0, 2) === "BS" || msg.content.substring(0, 2) === "ＢＳ" || msg.content.substring(0, 2) === "bs") {
      var gakubu = "応用生物学部";
      var role = BS;
    } else if (msg.content.substring(0, 2) === "CS" || msg.content.substring(0, 2) === "ＣＳ" || msg.content.substring(0, 2) === "cs") {
      var gakubu = "コンピュータサイエンス学部";
      var role = CS;
    } else if (msg.content.substring(0, 2) === "MS" || msg.content.substring(0, 2) === "ＭＳ" || msg.content.substring(0, 2) === "ms") {
      var gakubu = "メディア学部";
      var role = MS;
    } else if (msg.content.substring(0, 2) === "ES" || msg.content.substring(0, 2) === "ＥＳ" || msg.content.substring(0, 2) === "es") {
      var gakubu = "工学部";
      var role = ES;
    } else if (msg.content.substring(0, 2) === "DS" || msg.content.substring(0, 2) === "ＤＳ" || msg.content.substring(0, 2) === "ds") {
      var gakubu = "デザイン学部";
      var role = DS;
    } else if (msg.content.substring(0, 2) === "HS" || msg.content.substring(0, 2) === "ＨＳ" || msg.content.substring(0, 2) === "hs") {
      var gakubu = "医療保健学部";
      var role = HS;
    }

    if (role === undefined) {
      return;
    } else {
      if (msg.member.roles.cache.some(r => r == no_Authed)) { // 未認証ロール存在確認
        msg.member.roles.remove(no_Authed); // 対象ユーザーから未認証ロール削除
        msg.member.roles.add(role); // 対象ユーザーに対象学部のロールを付与
        msg.member.roles.add(Authed); // 対象ユーザーに認証済みのロールを付与

        const grach = new MessageEmbed()
          .setTitle(user + "さんいらっしゃい！")
          .setColor("#00ff6a")
          .setDescription(
            "自己紹介ありがとうございます。自己紹介文を認識しました。TUT22での会話をお楽しみください(^^)"
          )
          .addFields({
            name: "\u200B",
            value:
              gakubu + "のロールを付与し，認証済みユーザーとなりました。よろしくね！",
          })
          .setTimestamp()
          .setFooter(botname, "https://i.imgur.com/AJdL29v.jpg");
        message_Send({ embeds: [grach] });

      } else {
        message_Send(`<@${msg.member.id}>` + " 既に認証済みです。他に操作は必要ありません。（混乱防止の為，あなたの直前のメッセージは2秒後自動で削除されます。）");
        await setTimeout(2000);
        await msg.delete()
      }
    }
  }
});
client.login(token);