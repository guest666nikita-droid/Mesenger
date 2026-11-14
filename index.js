const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
admin.initializeApp();

async function push(uids, title, body) {
  const snaps = await Promise.all(uids.map(u => admin.firestore().doc('tokens/' + u).get()));
  const tokens = snaps.flatMap(s => (s.exists ? s.data().list || [] : []));
  if (tokens.length) await admin.messaging().sendEachForMulticast({ tokens, notification: { title, body } });
}

// Новое сообщение, фото, голосовое или звонок в чате -> push остальным участникам
exports.onNewMessage = onDocumentCreated('chats/{chatId}/messages/{id}', async e => {
  const m = e.data.data();
  const chat = (await admin.firestore().doc('chats/' + e.params.chatId).get()).data();
  if (!chat) return;
  const to = chat.members.filter(u => u !== m.from);
  const body = m.call ? (m.video ? 'Видеозвонок' : 'Входящий звонок') : m.audio ? 'Голосовое сообщение' : m.img ? 'Фото' : m.video ? 'Видео' : m.text;
  await push(to, m.name || 'Новое сообщение', body);
});
