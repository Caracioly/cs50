#include <stdio.h>
#include <stdlib.h>
#include <cs50.h>

void swap(int *a, int *b);

int main(void)
{
    int a = get_int("A: ");
    int b = get_int("B: ");

    printf("Before Swap\n A: %i B: %i\n", a, b);

    swap(&a, &b);

    printf("After Swap\n A: %i B: %i\n", a, b);
}

void swap(int *a, int *b)
{
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
