#include <cs50.h>
#include <stdio.h>

int get_height(void);
void print_pyramid(int height);

int main(void)
{
    // get the height selected by the user
    int height = get_height();

    // print the pyramid
    print_pyramid(height);
}

int get_height(void)
{
    int height;
    do
    {
        height = get_int("Height: ");
    }
    while (height < 1 || height > 8);
    return height;
}

void print_pyramid(int height)
{
    int count = 1;
    while (count < height + 1)
    {
        // empty spaces for the first pyramid
        for (int k = 0; k < height - count; k++)
        {
            printf(" ");
        }

        // blocks for the first pyramid
        for (int i = 0; i < count; i++)
        {
            printf("#");
        }

        // empty space bettween pyramids
        printf("  ");

        // blocks for the second pyramid
        for (int j = 0; j < count; j++)
        {
            printf("#");
        }

        printf("\n");
        count++;
    }
}
