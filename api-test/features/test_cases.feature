Feature: Test Hasura Blog Engine GraphQL API
    Everybody wants to know when it's Friday

    # Assign global variables
    Background:
        Given header x-hasura-global = "Hello"

    Scenario: Anonymous User (Reader): Has Posts (>=1)
        Given query by "data/get_post.graphql"
        # And variables by "data/get_post_variable.json"
        And header x-hasura-admin-secret = "iamdmin"
        And header x-hasura-role = "user"
        And header x-hasura-user-id = "c84a2ecb-df11-481a-9943-58c1aa91f06c"
        And header x-hasura-organization-id = "98e5f498-84b0-4362-bf4a-3fef282e9494"
        When receive a response
        Then status 200
