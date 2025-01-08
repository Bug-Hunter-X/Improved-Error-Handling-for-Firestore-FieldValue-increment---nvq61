function incrementCounter(userId) {
  // Get a reference to the counter document
  const counterRef = db.collection('users').doc(userId).collection('counters').doc('main');
  
  // Attempt to update the counter
  return counterRef.update({
    count: firebase.firestore.FieldValue.increment(1)
  })
  .catch(error => {
    // If the counter doesn't exist, create it with a starting value of 1
    if (error.code === 'not-found') {
      return counterRef.set({ count: 1 });
    }
    // Otherwise, rethrow the error
    throw error;
  });
}