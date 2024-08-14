#include <stdio.h>
#include <cs50.h>
#include <string.h>

int main(void)
{
    string name = get_string("What's your name? ");

    int len = strlen(name);

    printf("Legth: %i\n", len);
}

