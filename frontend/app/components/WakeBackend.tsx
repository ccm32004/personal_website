'use client';
import { useEffect } from 'react';
import { BACKEND_URL } from '../config';

export default function WakeBackend() {
    useEffect(() => {
      fetch(BACKEND_URL).catch(() => {
      });
    }, []);
  
    return null;
  }
