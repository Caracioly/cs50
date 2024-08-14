-- Keep a log of any SQL queries you execute as you solve the mystery.

-- sqlite3 fiftyville.db
--    .schema
--    .tables

-- Theft took place on July 28
-- Theft took place on Humphrey Street

SELECT description
FROM crime_scene_reports
WHERE month = 7 AND day = 28
AND street = "Humphrey Street";

-- "Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery.
-- Interviews were conducted today with three witnesses who were present at
-- the time – each of their interview transcripts mentions the bakery.
-- Littering took place at 16:36. No known witnesses."

SELECT activity
FROM bakery_security_logs
WHERE month = 7 AND day = 28
AND hour = 10 AND minute = 14;

SELECT activity
FROM bakery_security_logs
WHERE month = 7 AND day = 28
AND hour = 16;

SELECT people.name, bakery_security_logs.activity, bakery_security_logs.minute, bakery_security_logs.hour
FROM bakery_security_logs
JOIN people ON bakery_security_logs.license_plate = people.license_plate
WHERE bakery_security_logs.month = 7 AND bakery_security_logs.day = 28;

-- +---------+----------+--------+------+
-- |  name   | activity | minute | hour |
-- +---------+----------+--------+------+
-- | Alice   | entrance | 2      | 8    |
-- | Peter   | entrance | 2      | 8    |
-- | Alice   | exit     | 2      | 8    |
-- | Peter   | exit     | 2      | 8    |
-- | Rachel  | entrance | 7      | 8    |
-- | Rachel  | exit     | 7      | 8    |
-- | Debra   | entrance | 13     | 8    |
-- | Debra   | exit     | 13     | 8    |
-- | Wayne   | entrance | 15     | 8    |
-- | Jordan  | entrance | 15     | 8    |
-- | Wayne   | exit     | 15     | 8    |
-- | Jordan  | exit     | 15     | 8    |
-- | Iman    | entrance | 18     | 8    |
-- | Bruce   | entrance | 23     | 8    |
-- | George  | entrance | 25     | 8    |
-- | Michael | entrance | 25     | 8    |
-- | Michael | exit     | 25     | 8    |
-- | George  | exit     | 34     | 8    |
-- | Taylor  | entrance | 34     | 8    |
-- | Andrew  | entrance | 34     | 8    |
-- | Andrew  | exit     | 34     | 8    |
-- | Diana   | entrance | 36     | 8    |
-- | Ralph   | entrance | 38     | 8    |
-- | Ralph   | exit     | 38     | 8    |
-- | Kelsey  | entrance | 42     | 8    |
-- | Joshua  | entrance | 44     | 8    |
-- | Joshua  | exit     | 44     | 8    |
-- | Carolyn | entrance | 49     | 8    |
-- | Carolyn | exit     | 49     | 8    |
-- | Robin   | entrance | 50     | 8    |
-- | Robin   | exit     | 50     | 8    |
-- | Donna   | entrance | 57     | 8    |
-- | Donna   | exit     | 57     | 8    |
-- | Martha  | entrance | 59     | 8    |
-- | Martha  | exit     | 59     | 8    |
-- | Luca    | entrance | 14     | 9    |
-- | Vanessa | entrance | 15     | 9    |
-- | Barry   | entrance | 20     | 9    |
-- | Sofia   | entrance | 28     | 9    |
-- | Brandon | entrance | 8      | 10   |
-- | Sophia  | entrance | 14     | 10   |
-- | Vanessa | exit     | 16     | 10   |
-- | Bruce   | exit     | 18     | 10   |
-- | Barry   | exit     | 18     | 10   |
-- | Luca    | exit     | 19     | 10   |
-- | Sofia   | exit     | 20     | 10   |
-- | Iman    | exit     | 21     | 10   |
-- | Diana   | exit     | 23     | 10   |
-- | Kelsey  | exit     | 23     | 10   |
-- | Taylor  | exit     | 35     | 10   |
-- | Denise  | entrance | 42     | 10   |
-- | Thomas  | entrance | 44     | 10   |
-- | Jeremy  | entrance | 55     | 10   |
-- | Judith  | entrance | 6      | 11   |
-- | Mary    | entrance | 13     | 11   |
-- | Vincent | entrance | 52     | 11   |
-- | Daniel  | entrance | 20     | 12   |
-- | Frank   | entrance | 49     | 12   |
-- | Amanda  | entrance | 8      | 13   |
-- | John    | entrance | 30     | 13   |
-- | Ethan   | entrance | 42     | 13   |
-- | Ethan   | exit     | 18     | 14   |
-- | Amanda  | exit     | 6      | 15   |
-- | Vincent | exit     | 16     | 15   |
-- | Thomas  | exit     | 6      | 16   |
-- | John    | exit     | 38     | 16   |
-- | Frank   | exit     | 42     | 16   |
-- | Mary    | exit     | 47     | 16   |
-- | Denise  | exit     | 11     | 17   |
-- | Sophia  | exit     | 15     | 17   |
-- | Jeremy  | exit     | 16     | 17   |
-- | Brandon | exit     | 18     | 17   |
-- | Daniel  | exit     | 36     | 17   |
-- | Judith  | exit     | 47     | 17   |
-- +---------+----------+--------+------+

-- suspects :
-- "luca, vanessa, baryy sofia, brandon, iman. bruce,
-- taylor, diana, kelsey, sophia"

-- exit right after the occour:
-- "vanessa, bruce, barry, luca"

-- new suspects
-- | Vanessa | exit     | 16     | 10   |
-- | Bruce   | exit     | 18     | 10   |
-- | Barry   | exit     | 18     | 10   |
-- | Luca    | exit     | 19     | 10   |
-- | Sofia   | exit     | 20     | 10   |
-- | Iman    | exit     | 21     | 10   |
-- | Diana   | exit     | 23     | 10   |
-- | Kelsey  | exit     | 23     | 10   |


SELECT name, transcript
FROM interviews
WHERE month = 7 AND day = 28;

-- +---------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
-- |  name   |                                                                                                                                                     transcript                                                                                                                                                      |
-- +---------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
-- | Jose    | “Ah,” said he, “I forgot that I had not seen you for some weeks. It is a little souvenir from the King of Bohemia in return for my assistance in the case of the Irene Adler papers.”                                                                                                                               |
-- | Eugene  | “I suppose,” said Holmes, “that when Mr. Windibank came back from France he was very annoyed at your having gone to the ball.”                                                                                                                                                                                      |
-- | Barbara | “You had my note?” he asked with a deep harsh voice and a strongly marked German accent. “I told you that I would call.” He looked from one to the other of us, as if uncertain which to address.                                                                                                                   |
-- | Ruth    | Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery parking lot and drive away. If you have security footage from the bakery parking lot, you might want to look for cars that left the parking lot in that time frame.                                                          |
-- | Eugene  | I don't know the thief's name, but it was someone I recognized. Earlier this morning, before I arrived at Emma's bakery, I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.                                                                                                 |
-- | Raymond | As the thief was leaving the bakery, they called someone who talked to them for less than a minute. In the call, I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow. The thief then asked the person on the other end of the phone to purchase the flight ticket. |
-- | Lily    | Our neighboring courthouse has a very annoying rooster that crows loudly at 6am every day. My sons Robert and Patrick took the rooster to a city far, far away, so it may never bother us again. My sons have successfully arrived in Paris.                                                                        |
-- +---------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

---- | Ruth | Sometime within ten minutes of the theft,
-- I saw the thief get into a car in the bakery parking
-- lot and drive away. If you have security footage from
-- the bakery parking lot, you might want to look for cars
-- that left the parking lot in that time frame.


-- | Eugene  | I don't know the thief's name, but it was
-- someone I recognized. Earlier this morning, before
-- I arrived at Emma's bakery, I was walking by the ATM on
-- Leggett Street and saw the thief there withdrawing some money.

SELECT description, street
FROM crime_scene_reports
WHERE month = 7 AND day = 28;

-- +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------+
-- |                                                                                                       description                                                                                                        |     street      |
-- +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------+
-- | Vandalism took place at 12:04. No known witnesses.                                                                                                                                                                       | Axmark Road     |
-- | Shoplifting took place at 03:01. Two people witnessed the event.                                                                                                                                                         | Boyce Avenue    |
-- | Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery. Interviews were conducted today with three witnesses who were present at the time – each of their interview transcripts mentions the bakery. | Humphrey Street |
-- | Money laundering took place at 20:30. No known witnesses.                                                                                                                                                                | Widenius Street |
-- | Littering took place at 16:36. No known witnesses.                                                                                                                                                                       | Humphrey Street |
-- +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------+

SELECT amount, transaction_type
FROM atm_transactions
WHERE month = 7 AND day = 28 AND atm_location = "Leggett Street";


SELECT p.name, at.amount, at.transaction_type
FROM atm_transactions at
JOIN bank_accounts ba ON at.account_number = ba.account_number
JOIN people p ON ba.person_id = p.id
WHERE at.month = 7 AND at.day = 28
AND at.atm_location = 'Leggett Street';

-- suspects
-- bruce, iman, diana,  luca

-- +---------+--------+------------------+
-- |  name   | amount | transaction_type |
-- +---------+--------+------------------+
-- | Bruce   | 50     | withdraw         |
-- | Kaelyn  | 10     | deposit          |
-- | Diana   | 35     | withdraw         |
-- | Brooke  | 80     | withdraw         |
-- | Kenny   | 20     | withdraw         |
-- | Iman    | 20     | withdraw         |
-- | Luca    | 48     | withdraw         |
-- | Taylor  | 60     | withdraw         |
-- | Benista | 30     | withdraw         |
-- +---------+--------+------------------+


-- | Raymond | As the thief was leaving the bakery,
-- they called someone who talked to them for less than
-- a minute. In the call, I heard the thief say that they
-- were planning to take the earliest flight out of Fiftyville
-- tomorrow. The thief then asked the person on the other end of
-- the phone to purchase the flight ticket.

SELECT caller, receiver, duration
FROM phone_calls
WHERE month = 7 AND day = 28 AND duration <= 60;

SELECT caller_person.name AS caller_name, receiver_person.name AS receiver_name, pc.duration
FROM phone_calls pc
JOIN people caller_person ON pc.caller = caller_person.phone_number
JOIN people receiver_person ON pc.receiver = receiver_person.phone_number
WHERE pc.month = 7 AND pc.day = 28 AND pc.duration <= 60;

-- +-------------+---------------+----------+
-- | caller_name | receiver_name | duration |
-- +-------------+---------------+----------+
-- | Sofia       | Jack          | 51       |
-- | Kelsey      | Larry         | 36       |
-- | Bruce       | Robin         | 45       |
-- | Kathryn     | Luca          | 60       |
-- | Kelsey      | Melissa       | 50       |
-- | Taylor      | James         | 43       |
-- | Diana       | Philip        | 49       |
-- | Carina      | Jacqueline    | 38       |
-- | Kenny       | Doris         | 55       |
-- | Benista     | Anna          | 54       |
-- +-------------+---------------+----------+

-- BRUCE -> ROBIN
-- DIANA -> Philip

SELECT abbreviation, full_name, city
FROM airports
;
-- +--------------+-----------------------------------------+---------------+
-- | abbreviation |                full_name                |     city      |
-- +--------------+-----------------------------------------+---------------+
-- | ORD          | O'Hare International Airport            | Chicago       |
-- | PEK          | Beijing Capital International Airport   | Beijing       |
-- | LAX          | Los Angeles International Airport       | Los Angeles   |
-- | LGA          | LaGuardia Airport                       | New York City |
-- | DFS          | Dallas/Fort Worth International Airport | Dallas        |
-- | BOS          | Logan International Airport             | Boston        |
-- | DXB          | Dubai International Airport             | Dubai         |
-- | CSF          | Fiftyville Regional Airport             | Fiftyville    |
-- | HND          | Tokyo International Airport             | Tokyo         |
-- | CDG          | Charles de Gaulle Airport               | Paris         |
-- | SFO          | San Francisco International Airport     | San Francisco |
-- | DEL          | Indira Gandhi International Airport     | Delhi         |
-- +--------------+-----------------------------------------+---------------+

SELECT origin.full_name AS Origin, destination.full_name AS Destination
FROM flights f
JOIN airports origin ON f.origin_airport_id = origin.id
JOIN airports destination ON f.destination_airport_id = destination.id
WHERE f.month = 7 AND f.day = 28 AND origin.full_name == "Fiftyville Regional Airport";

-- +-----------------------------+-----------------------------------------+
-- |           Origin            |               Destination               |
-- +-----------------------------+-----------------------------------------+
-- | Fiftyville Regional Airport | Dubai International Airport             |
-- | Fiftyville Regional Airport | Dallas/Fort Worth International Airport |
-- | Fiftyville Regional Airport | LaGuardia Airport                       |
-- | Fiftyville Regional Airport | Dallas/Fort Worth International Airport |
-- | Fiftyville Regional Airport | LaGuardia Airport                       |
-- +-----------------------------+-----------------------------------------+

SELECT
    origin.full_name AS Origin,
    destination.full_name AS Destination,
    p.passport_number,
    p.seat
FROM flights f
JOIN airports origin ON f.origin_airport_id = origin.id
JOIN airports destination ON f.destination_airport_id = destination.id
JOIN passengers p ON f.id = p.flight_id
WHERE f.month = 7 AND f.day = 29
AND origin.full_name = "Fiftyville Regional Airport";


SELECT
    origin.full_name AS Origin,
    destination.full_name AS Destination,
    p.name AS Passenger_Name,
    ps.seat
FROM flights f
JOIN airports origin ON f.origin_airport_id = origin.id
JOIN airports destination ON f.destination_airport_id = destination.id
JOIN passengers ps ON f.id = ps.flight_id
JOIN people p ON ps.passport_number = p.passport_number
WHERE f.month = 7 AND f.day = 29
AND origin.full_name = 'Fiftyville Regional Airport';

-- BRUCE -> ROBIN
-- DIANA -> Philip
-- +-----------------------------+-------------------------------------+----------------+------+
-- |           Origin            |             Destination             | Passenger_Name | seat |
-- +-----------------------------+-------------------------------------+----------------+------+
-- | Fiftyville Regional Airport | Logan International Airport         | Gloria         | 9C   |
-- | Fiftyville Regional Airport | Logan International Airport         | Kristina       | 2C   |
-- | Fiftyville Regional Airport | Logan International Airport         | Douglas        | 3C   |
-- | Fiftyville Regional Airport | Logan International Airport         | Diana          | 4C   |
-- | Fiftyville Regional Airport | Logan International Airport         | Christian      | 5D   |
-- | Fiftyville Regional Airport | Logan International Airport         | Michael        | 6B   |
-- | Fiftyville Regional Airport | Logan International Airport         | Ethan          | 7A   |
-- | Fiftyville Regional Airport | Logan International Airport         | Charles        | 8D   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Dennis         | 7D   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Jose           | 8A   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Jennifer       | 9B   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Brandon        | 2C   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Matthew        | 3A   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Emily          | 4A   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Douglas        | 5A   |
-- | Fiftyville Regional Airport | San Francisco International Airport | Jordan         | 6B   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Doris          | 2A   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Sofia          | 3B   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Bruce          | 4A   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Edward         | 5C   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Kelsey         | 6C   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Taylor         | 6D   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Kenny          | 7A   |
-- | Fiftyville Regional Airport | LaGuardia Airport                   | Luca           | 7B   |
-- | Fiftyville Regional Airport | O'Hare International Airport        | Daniel         | 7B   |
-- | Fiftyville Regional Airport | O'Hare International Airport        | Carol          | 8A   |
-- | Fiftyville Regional Airport | O'Hare International Airport        | Rebecca        | 9A   |
-- | Fiftyville Regional Airport | O'Hare International Airport        | Sophia         | 2C   |
-- | Fiftyville Regional Airport | O'Hare International Airport        | Heather        | 3B   |
-- | Fiftyville Regional Airport | O'Hare International Airport        | Marilyn        | 4A   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | Richard        | 9B   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | Thomas         | 2C   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | Brooke         | 3D   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | Larry          | 4D   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | Steven         | 5A   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | John           | 6D   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | Pamela         | 7A   |
-- | Fiftyville Regional Airport | Tokyo International Airport         | Melissa        | 8C   |
-- +-----------------------------+-------------------------------------+----------------+------+

SELECT
    p.name AS Passenger_Name,
    ps.seat
FROM passengers ps
JOIN people p ON ps.passport_number = p.passport_number
WHERE ps.flight_id = (
    SELECT id
    FROM flights
    WHERE origin_airport_id = (
        SELECT id
        FROM airports
        WHERE full_name = 'Fiftyville Regional Airport'
    )
    AND month = 7 AND day = 29
    ORDER BY hour, minute
);

---LaGuardia Airport | Doris          | 2A   |
---LaGuardia Airport | Sofia          | 3B   |
---LaGuardia Airport | Bruce          | 4A   |
---LaGuardia Airport | Edward         | 5C   |
---LaGuardia Airport | Kelsey         | 6C   |
---LaGuardia Airport | Taylor         | 6D   |
---LaGuardia Airport | Kenny          | 7A   |
---LaGuardia Airport | Luca           | 7B   |

-- +---------
-- | caller_name | receiver_name | duration |
-- +-------------+---------------+----------+
-- | Sofia       | Jack          | 51       |
-- | Kelsey      | Larry         | 36       |
-- | Bruce       | Robin         | 45       |
-- | Kathryn     | Luca          | 60       |
-- | Kelsey      | Melissa       | 50       |
-- | Taylor      | James         | 43       |
-- | Diana       | Philip        | 49       |
-- | Carina      | Jacqueline    | 38       |
-- | Kenny       | Doris         | 55       |
-- | Benista     | Anna          | 54       |
-- +-------------+---------------+----------+

-- | Vanessa | exit     | 16     | 10   |
-- | Bruce   | exit     | 18     | 10   |
-- | Barry   | exit     | 18     | 10   |
-- | Luca    | exit     | 19     | 10   |
-- | Sofia   | exit     | 20     | 10   |
-- | Iman    | exit     | 21     | 10   |
-- | Diana   | exit     | 23     | 10   |
-- | Kelsey  | exit     | 23     | 10   |

-- +---------+--------+------------------+
-- |  name   | amount | transaction_type |
-- +---------+--------+------------------+
-- | Bruce   | 50     | withdraw         |
-- | Kaelyn  | 10     | deposit          |
-- | Diana   | 35     | withdraw         |
-- | Brooke  | 80     | withdraw         |
-- | Kenny   | 20     | withdraw         |
-- | Iman    | 20     | withdraw         |
-- | Luca    | 48     | withdraw         |
-- | Taylor  | 60     | withdraw         |
-- | Benista | 30     | withdraw         |
-- +---------+--------+------------------+
