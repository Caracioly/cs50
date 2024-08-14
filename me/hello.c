#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // say hello to you
    string name = get_string("What's your name? ");
    printf("hello, %s\n", name);
}
