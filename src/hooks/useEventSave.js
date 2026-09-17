import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useEventSave(eventId) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkStatus = useCallback(async () => {
    setChecking(true);
    if (user) {
      const { data } = await supabase
        .from('saved_events')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', user.id)
        .maybeSingle();
      setIsSaved(!!data);
    } else {
      setIsSaved(false);
    }
    setChecking(false);
  }, [eventId, user]);

  useEffect(() => { checkStatus(); }, [checkStatus]);

  const toggleSave = async () => {
    if (!user) return;
    setLoading(true);
    
    if (isSaved) {
      await supabase.from('saved_events')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);
      setIsSaved(false);
    } else {
      await supabase.from('saved_events').insert({
        user_id: user.id,
        event_id: eventId,
      });
      setIsSaved(true);
    }
    
    setLoading(false);
  };

  return { isSaved, loading, checking, toggleSave };
}
