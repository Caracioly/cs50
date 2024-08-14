#include <stdio.h>
#include <stdlib.h>

typedef struct node
{
    int number;
    struct node *next;
}
node;

bool search(node *tree, int target);

int main(int argc, char *argv[])
{
    node *list = NULL;

    for (int i = 1; i < argc; i++)
    {
        int number = atoi(argv[i]);

        node *n = malloc(sizeof(node));
        if ( n == NULL )
        {
            return 1;
        }

        n->number = number;
        n->next = NULL;

        n->next = list;
        list = n;
    }

    node *ptr = list;
    while(ptr != NULL)
    {
        printf("%i\n", ptr->number);
        ptr = ptr->next;
    }

    ptr = list;
    while ( ptr ! = NULL)
    {
        node *next = ptr->next;
        free(ptr);
        ptr = next;
    }

}

bool search(node *tree, int target)
{
    if(tree == NULL)
    {
        return false;
    }
    else if (target < tree->number)
    {
        return search(tree->left, target);
    }
    else if (target > tree->number)
    {
        return search(tree->right, target);
    }
    else
    {
        return true;
    }
    
    return false
}
