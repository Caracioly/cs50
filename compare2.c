#include <cs50.h>
#include <stdio.h>

int main(void)
{
    string i = get_string("i: ");
    string j = get_string("j: ");

    if (i == j)
    {
        printf("Same\n");
    }
    else
    {
        printf("Different\n");
    }
}
