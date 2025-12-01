"""update_seating_count_constraint_to_100

Revision ID: 642660d88000
Revises: 9fd49429c94e
Create Date: 2025-12-01 21:02:12.827032

"""

from typing import Sequence, Union

from alembic import op  # type: ignore

# revision identifiers, used by Alembic.
revision: str = "642660d88000"
down_revision: Union[str, Sequence[str], None] = "9fd49429c94e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # PostgreSQL auto-generated constraint name, so we use raw SQL
    op.execute(
        """
        ALTER TABLE restaurant_table 
        DROP CONSTRAINT IF EXISTS restaurant_table_seating_count_check,
        ADD CONSTRAINT check_seating_count 
        CHECK (seating_count > 0 AND seating_count <= 100)
        """
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute(
        """
        ALTER TABLE restaurant_table 
        DROP CONSTRAINT IF EXISTS check_seating_count,
        ADD CONSTRAINT restaurant_table_seating_count_check 
        CHECK (seating_count > 0 AND seating_count <= 20)
        """
    )
