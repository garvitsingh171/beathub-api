# Design Decisions

## Why did you reference Songs in the Playlist instead of embedding them?

Refrencing Songs allows for better data normalization and reduces redundancy. If a song is included in multiple playlists, refrencing ensures that any updates to the song's details (like title or artist) are reflected across all playlists without needing to update each one individually.

## Why did you reference the Artist in the Song model?

Refrencing the Artist in the Song model allows for a clear separation of concerns and better organization of data. It enables multiple songs to be associated with the same artist without duplicating artist information in each song document. This approach also facilitates easier updates to artist details and improves query performance when retrieving songs by a specific artist.
