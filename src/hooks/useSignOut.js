import pb from '../lib/pocketbase';
import  { useState } from 'react';

const useSignOut = () => {

    function signOut() {
        pb.authStore.clear();
    };

    return signOut;
};

export default useSignOut;