SELECT title
FROM movies
WHERE id IN
(
    SELECT movie_id
    FROM stars
    WHERE person_id IN
    (
        SELECT id
        FROM people
        WHERE name = "Bradley Cooper"
    )
    AND movie_id IN
    (
        SELECT movie_id
        FROM stars
        WHERE person_id =
        (
            SELECT id
            FROM people
            WHERE name = 'Jennifer Lawrence'
        )
    )
);
