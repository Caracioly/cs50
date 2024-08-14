#include <cs50.h>
#include <stdio.h>
#include <string.h>

string get_card_flag(string card_numbers);

int main(void)
{
    long card_number = get_long("Number: ");

    // isolate the numbers in characters to navegate between indexes
    char str[17];
    snprintf(str, sizeof(str), "%li", card_number);
    int len = strlen(str);

    // get the correct card flag
    string card_flag = get_card_flag(str);

    int count = 1;

    // product create to hold the multiplied values
    char product[17];
    product[0] = '\0';

    // loop trought the main string to get every other digit by 2 and multiply
    for (int i = len - 1; i >= 0; i--)
    {
        if ((len - i) % 2 == 0)
        {
            int digit = str[i] - '0';
            digit *= 2;

            char temp[3];
            snprintf(temp, sizeof(temp), "%d", digit);
            strcat(product, temp);

            memmove(&str[i], &str[i + 1], strlen(str) - i);
        }
        count++;
    }

    // loop for sum those products together
    int sum = 0;
    for (int i = 0; i < strlen(product); i++)
    {
        sum += product[i] - '0';
    }

    // loop for add to the sum of the digits that weren't multiplied by 2
    for (int i = 0; i < strlen(str); i++)
    {
        sum += str[i] - '0';
    }

    if (sum % 10 == 0)
    {
        printf("%s\n", card_flag);
    }
    else
    {
        printf("INVALID\n");
    }
}

// function responsible to deal with cards flags
string get_card_flag(string card_numbers)
{
    if (strlen(card_numbers) == 16)
    {
        if (card_numbers[0] == '5')
        {
            if (card_numbers[1] == '1' || card_numbers[1] == '2' || card_numbers[1] == '3' ||
                card_numbers[1] == '4' || card_numbers[1] == '5')
            {
                return "MASTERCARD";
            }
        }
        else if (card_numbers[0] == '4')
        {
            return "VISA";
        }
    }
    else if (strlen(card_numbers) == 15)
    {
        if (card_numbers[0] == '3')
        {
            if (card_numbers[1] == '4' || card_numbers[1] == '7')
            {
                return "AMEX";
            }
        }
    }
    else if (strlen(card_numbers) == 13)
    {
        if (card_numbers[0] == '4')
        {
            return "VISA";
        }
    }
    return "INVALID";
}
