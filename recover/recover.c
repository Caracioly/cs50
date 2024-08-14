#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

const int BUFFER_SIZE = 512;

int main(int argc, char *argv[])
{
    // Accept a single command-line argument
    if (argc != 2)
    {
        printf("Usage: ./recover FILE\n");
        return 1;
    }

    // Open the memory card
    FILE *card = fopen(argv[1], "r");
    if (card == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    // Create a buffer for a block of data
    uint8_t buffer[BUFFER_SIZE];

    // Counter of numbers of JPEG
    int file_counter = 0;

    // output img
    FILE *img = NULL;

    // Tells if is still writing a single file to not start another one yet
    bool writing = false;

    while (fread(buffer, 1, BUFFER_SIZE, card) == 512)
    {
        // checks every jpeg header
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff &&
            (buffer[3] & 0xf0) == 0xe0)
        {
            // if is writing closes the current file
            if (writing)
            {
                fclose(img);
            }
            else
            {
                // if not writing start another one
                writing = true;
            }

            // new jpeg config
            char filename[8];
            sprintf(filename, "%03i.jpg", file_counter);
            img = fopen(filename, "w");
            if (img == NULL)
            {
                printf("Could not create a JPEG.\n");
                return 1;
            }

            file_counter++;
        }
        // writing current block
        if (writing)
        {
            fwrite(buffer, 1, BUFFER_SIZE, img);
        }
    }

    // closes remeaning jpeg
    if (img != NULL)
    {
        fclose(img);
    }

    fclose(card);

    return 0;
}
