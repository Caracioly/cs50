#include <cs50.h>
#include <stdio.h>
#include <string.h>

typedef struct
{
    string name;
    string number;
} person;

int main(void)
{
    person people[2] = {
        {"Carter", "+1-617-495-1000"},
        {"David", "+1-949-468-2750"}
    };

    string name = get_string("Name: ");
    for (int i= 0; i < 2; i++)
    {
        if (strcmp(people[i].name, name) == 0)
        {
            printf("Found: %s\n", people[i].number);
            return 0;
        }
    }
    printf("Not Found\n");
    return 1;
}
