function incrementCounter(userId) {
  const counterRef = db.collection('users').doc(userId).collection('counters').doc('main');

  return counterRef.update({
    count: firebase.firestore.FieldValue.increment(1)
  })
  .catch(error => {
    console.error('Error incrementing counter:', error);
    if (error.code === 'not-found') {
      return counterRef.set({ count: 1 })
      .catch(setErr => {
        console.error('Error creating counter:', setErr);
        // Handle error appropriately, e.g., throw or return a specific value
        throw new Error('Failed to create or increment counter');
      });
    } else if (error.code === 'permission-denied'){
        console.error('Permission denied:', error);
        throw new Error('Insufficient permission to access or update the counter');
    } else {
      //Handle other potential errors.
      throw error; // Re-throw other errors for higher-level handling
    }
  });
}