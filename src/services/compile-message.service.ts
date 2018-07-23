// * Function for Messages compilation

// This is sent to the Discord Channel in the community.
export function helpRequest(message: string, connectionID: string) {
  return `Hey Merit Community!
  \nA new user, \`${connectionID}\`, is looking for an help!
  \n**THEIR HELP APPLICATION IS BELOW:**
  \n\`\`\`\n${message}\`\`\`
  \nIf you want to help this user, please DM me with the following message:
  \n \`help to: ${connectionID}@\`
  \n*NEED HELP?*
  \nSend me a DM with: \`#how-it-works\`.
  \n----------------------------------------------------`;
}

//This is sent to the USER via DM, regular message
export function regularMessage(user: string, message: string) {
  return `*USER: ${user}* \n\n${message}\n----------------------------------------------------`;
}

//This is sent to the USER via DM, exception message
export function connectedToClient(id: string) {
  return `You are helping the user with ID: \`${id}\`
  \nIf you don't want to continue helping, just tell me to \`#stop\`
  \nNeed help? Ask me \`#how-it-works\``;
}

// Sent to the USER if there is an error
export function unableToConnect() {
  return `Sorry!  It seems there was a problem connecting with the user.  It is most likely because:
  \n 1) Invalid format.  Please check the connection ID you entered, and be sure it is in this format: \`help to: #0-0000000000000@\`
  \n 2) Already-in-progress.  Someone from the community already helping this user.
  \n 3) The user changed their mind.  They closed the help window before we could assist them.`;
}

// Sent to the public channel when the APPLICANT has been approved.
export function requestTaken(id: string, discordUser: string) {
  return `Woooh!  User ${id} is getting help from the Merit community! Thank you, **@${discordUser}**!
  \n----------------------------------------------------
  \n
  \n`;
}

// Sent to the USER in DM if they are duplicating connections.
export function alreadyInPair(id: string) {
  return `Oops, it looks like you are already helping user (\`${id}\`). \n Please type \`#stop\` if you want to stop that process.`;
}

// Sent to the USER once closed.
export function pairDestroyed() {
  return 'The help request has been cancelled.  You are now free to help someone new!';
}

export function thanksForHelp() {
  return 'Thank You for helping!\nYou are now free to help someone new!';
}

// Discord user disconnected
export function disconnected() {
  return 'You have disconnected from the help application!';
}

// If you are not helping new users right now.
export function noActiveConnections() {
  return 'You are not currently helping any users.';
}

// With the USER, via DM
export function getHelp() {
  return `***MERIT HELP BOT**\n*The Merit Help Bot aims to connect new users to existing members of the community.
  \nYou can text with new user via a direct message (DM) to the BOT. You can use the following list of commands:*
  \n1) Connect to a new user with command: \`help to: #0-0000000000000@\`
  \n2) You cannot help 2 new users at the same time. To cancel your existing helping process please type: \`#stop\`
  \n3) If you are still confused, I can tell you how it works if you type:  \`#how-it-works\``;
}

// Error to the USER.
export function defaultException() {
  return `Oops! It looks like you are not actively helping any new users right now.  This could be because:
  \n 1) The user closed the support application window.
  \n 2) You sent me a message even though there are no new users applying for help right now.  Type: \`#how-it-works\`
  \n 3) You sent a message that I do not understand.  To see which commands I respond to, type: \`#help\``;
}

// How to use the bot -- sent to USER.
export function howToUse() {
  return `The Merit Help bot allows users who do not use Discord or Telegram to request help directly from the website!
  \nThey will fill out an application that looks like this: https://prnt.sc/k7z09o
  \nIf you decided to help, you will start a direct chat with site user with the Discord Bot passing along your messages. 
  \nTo use the Merit Help Bot:
  \n 1) Copy the required message to connect to the new user: http://prntscr.com/k7z17x
  \n 2) Send that message to me via direct message (DM).  Here's how: click on my username, paste the message you copied above, and press enter! http://prntscr.com/k7z1lq
  \n 3) If you are the first person who responds to me, you will have the opportunity to help this new user.
  \n 4) Remember, you can only help one new user at a time.`;
}
