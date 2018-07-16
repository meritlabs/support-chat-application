// * Function for Messages compilation

// This is sent to the Discord Channel in the community.
export function helpRequest(message: string, connectionID: string) {
  return `Hey Merit Community!
  \nA new user, \`${connectionID}\`, is looking for an help!
  \n**THEIR HELP APPLICATION IS BELOW:**
  \n\`\`\`\n${message}\`\`\`
  \nIf you want to help this user please DM me with the following message:
  \n \`help to: ${connectionID}@\`
  \n*NEED HELP?*
  \nSend me a DM with: \`#how-it-works\`.
  \n----------------------------------------------------`;
}

//This is sent to the USER via DM, regular message
export function regularMessage(user: string, message: string) {
  return `*USER: ${user}*\n\`\`\`${message} \`\`\``;
}

//This is sent to the USER via DM, exception message
export function connectedToClient(id: string) {
  return `You are helping to user with ID: \`${id}\`
  \nIf you don't want to continue help, tell me to \`#stop\`
  \nNeed help? Ask me \`#how-it-works\``;
}

// Sent to the USER if there is an error
export function unableToConnect() {
  return `Sorry!  It seems there was a problem with connecting this user.  It is most likely for one of the reasons below:
  \n 1) Invalid format.  Please check the connection ID you entered, and be sure it is in this format: \`help to: #0-0000000000000@\`
  \n 2) Already-in-progress.  Somebody from the community already helping this user.
  \n 3) The user changed their mind.  They closed the application process window before we could help them.`;
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
  return `Oops, it looks like you are already-in-progress with helping to the user (\`${id}\`). \n Please type \`#stop\` if you want to stop that process.`;
}

// Sent to the USER once closed.
export function pairDestroyed() {
  return 'Your helping process has been cancelled.  You are now free to help someone new!';
}

// If you are not inviting new users right now.
export function noActiveConnections() {
  return 'You are not currently helping any users.';
}

// With the USER, via DM
export function getHelp() {
  return `***MERIT HELP BOT**\n*The Merit Help Bot aims to connect new users to existing members of the community.
  \nYou can text with new user via a direct message (DM) to the BOT. You can use the following list of commands:*
  \n1) Connect to the new user with command: \`help to: #0-0000000000000@\`
  \n2) You cannot help 2 new users at the same time. To cancel your existing he;ping process please type: \`#stop\`
  \n3) If you are still confused, I can tell you how it works if you type:  \`#how-it-works\``;
}

// Error to the USER.
export function defaultException() {
  return `Oops! It looks like you are not actively helping any new users right now.  This could be because:
  \n 1) The new user closed the support application window.
  \n 2) You sent me a message even though there are no new users applying for help right now.  Type: \`#how-it-works\`
  \n 3) You sent a message that I do not understand.  To see which commands I respond to, type: \`#help\``;
}

// How to use the bot -- sent to USER.
export function howToUse() {
  return `The Merit Help bot allows users who do not use Discord or Telegram to request an help directly from the website!
  \nThey will fill out an application that looks like this: http://prntscr.com/jxbfs5
  \nIf you offer to send them an help, they will receive your messages in the application chat window. 
  \nHere is how you use the Merit Help Bot:
  \n 1) Copy the required message to help this new user: http://prntscr.com/jxbhd3
  \n 2) Send that message to me via direct message (DM).  Here's how: click on my username and paste the message you copied above and press enter! http://prntscr.com/jxbhli
  \n 3) If you are the first person who responds to me, you will have the opportunity to help this new user to the Merit community.  http://prntscr.com/jxbi2t
  \n 4) Remember, you can only be in the process of helping one new user at a time.`;
}
