#include <stdio.h>
#include <cs50.h>

int get_size(void);
void print_grid(int size);

int main(void)
{
    int gridSize = get_size();

    print_grid(gridSize);
}

int get_size(void)
{
    int size;
    do
    {
        size = get_int("Size: ");
    }
    while (size < 1);
    return size;
}

void print_grid(int size)
{
     for(int row = 0; row < size; row++)
    {
        for(int col = 0; col < size; col++)
        {
            printf("#");
        }
        printf("\n");
    }
}
