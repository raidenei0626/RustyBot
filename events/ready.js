module.exports = async client => {
    // Await for all guild infromation to come in
    await client.wait(1000);

    // Loop to keep app data, upto date for the dashboard
    client.appInfo = await client.fetchApplication();
    setInterval( async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);

    // Loads the dasboard
    // require("../modules/dashboard")(client);
    require("../modules/mattboard")(client);

    // Set the Bots Status
    client.user.setStatus('dnd')
    client.user.setPresence({
        game: {
            name: `over ${client.users.size} Users!`,
            type: "WATCHING",
            url: "https://www.twitch.tv/monstercat"
        }
    });

    // Log that the bot is online.
    client.logger.ready(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);

    // Output the bots invite link
    try {
        let link = await client.generateInvite(["ADMINISTRATOR"]);
        client.logger.debug("Bot Invite: " + link);
    } catch (e) {
        console.log(e.stack)
    }
};
