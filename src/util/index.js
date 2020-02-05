export const mapSnapshotToCheckins = snapshot => {
  const checkins = [];
  snapshot.forEach(doc => {
    const checkin = { ...doc.data(), id: doc.id };
    checkins.push(checkin);
  });
  return checkins;
};
