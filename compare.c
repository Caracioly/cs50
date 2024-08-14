#include <stdio.h>
#include <cs50.h>

int main(void)
{
    int x = get_int("Whats's x? ");
    int y = get_int("What's y? ");

    if (x < y)
    {
        printf("x is less then y\n");
    }
    else if (y < x)
    {
        printf("y is less then y\n");
    }else
    {
        printf("x is equal to y\n");
    }
}
