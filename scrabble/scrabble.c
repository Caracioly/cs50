#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// interface to declare the type of array letters
typedef struct
{
    char letter;
    int value;
} LetterType;

// array with the potuation
LetterType letters[26] = {
    {'A', 1}, {'B', 3}, {'C', 3}, {'D', 2}, {'E', 1}, {'F', 4}, {'G', 2}, {'H', 4},  {'I', 1},
    {'J', 8}, {'K', 5}, {'L', 1}, {'M', 3}, {'N', 1}, {'O', 1}, {'P', 3}, {'Q', 10}, {'R', 1},
    {'S', 1}, {'T', 1}, {'U', 1}, {'V', 4}, {'W', 4}, {'X', 8}, {'Y', 4}, {'Z', 10},
};

int calculate_score(string player_word);
string calculate_winner(int player_1_score, int player_2_score);

int main(void)
{
    // getting the both players words
    string player_1_word = get_string("Player 1: ");
    string player_2_word = get_string("Player 2: ");

    // calling a function to give back the score of each
    int player_1_score = calculate_score(player_1_word);
    int player_2_score = calculate_score(player_2_word);

    // calculate the winner
    string winner = calculate_winner(player_1_score, player_2_score);

    printf("%s\n", winner);
}

// function to calculare the score from whatever word throwing here
int calculate_score(string player_word)
{
    int score = 0;
    for (int i = 0; i < strlen(player_word); i++)
    {
        for (int j = 0; j < 26; j++)
        {
            if (toupper(player_word[i]) == letters[j].letter)
            {
                score += letters[j].value;
            }
        }
    }
    return score;
}

// function to compare both scores
string calculate_winner(int player_1_score, int player_2_score)
{
    if (player_1_score > player_2_score)
    {
        return "Player 1 wins!";
    }
    else if (player_2_score > player_1_score)
    {
        return "Player 2 wins!";
    }
    else
    {
        return "Tie!";
    }
}
