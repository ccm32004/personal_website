from collections import defaultdict
import time
from fastapi import HTTPException

class RateLimiter:
    def __init__(self, window: int = 60, max_requests: int = 10):
        self.window = window
        self.max_requests = max_requests
        self._store = defaultdict(list)

    def check(self, key: str) -> None:
        """
        Check if the request should be rate limited.
        Raises HTTPException if rate limit is exceeded.
        """
        current_time = time.time()
        
        # Clean old timestamps
        self._store[key] = [
            ts for ts in self._store[key]
            if current_time - ts < self.window
        ]
        
        # Check limit
        if len(self._store[key]) >= self.max_requests:
            raise HTTPException(
                status_code=429,
                detail={
                    "error": "Rate limit exceeded",
                    "message": "Please wait a moment before sending more requests. 💫",
                    "retry_after": self.window
                }
            )
        
        # Add new timestamp
        self._store[key].append(current_time) 