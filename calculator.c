#include <cs50.h>
#include <stdio.h>

int sum(int x, int y);

int main(void)
{
    long x = get_long("x: ");
    long y = get_long("y: ");

    long result = sum(x, y);
    printf("x + y = %li\n", result);
}

int sum(int x, int y)
{
    return x + y;
}
