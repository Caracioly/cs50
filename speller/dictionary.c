// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// TODO: Choose number of buckets in hash table
const unsigned int N = 1000;

// Hash table
node *table[N];

// Number of words in the file
unsigned int word_count = 0;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    unsigned int hash_index = hash(word);
    node *cursor = table[hash_index];
    while (cursor != NULL)
    {
        // Compare strings (case insensitive)
        if (strcasecmp(word, cursor->word) == 0)
        {
            return true;
        }
        cursor = cursor->next;
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    unsigned int hash_index = 0;
    int i = 0;
    while (word[i] != '\0')
    {
        hash_index += tolower(word[i]);
        i++;
    }
    return hash_index % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // Open dictonary file
    FILE *source = fopen(dictionary, "r");
    if (source == NULL)
    {
        printf("Could not open the file\n");
        return false;
    }

    char word[LENGTH + 1];

    // Read strings from file one at a time
    while (fscanf(source, "%s", word) != EOF)
    {
        // alocate memory for the table
        node *tmp_node = malloc(sizeof(node));
        if (tmp_node == NULL)
        {
            printf("Could not allocate enough memory\n");
            fclose(source);
            return false;
        }

        strcpy(tmp_node->word, word);
        tmp_node->next = NULL;

        // returned index from hash function
        unsigned int hash_index = hash(word);

        // new node into the hash
        tmp_node->next = table[hash_index];
        table[hash_index] = tmp_node;

        // increases total of words in the file + 1
        word_count++;
    }

    // Close dictionary file
    fclose(source);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    if (word_count != 0)
    {
        return word_count;
    }
    return 0;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    for (int i = 0; i < N; i++)
    {
        node *cursor = table[i];
        while (cursor != NULL)
        {
            node *tmp = cursor;
            cursor = cursor->next;
            free(tmp);
        }
    }
    return true;
}
